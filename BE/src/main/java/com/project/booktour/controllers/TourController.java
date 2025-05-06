package com.project.booktour.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.models.Region;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.responses.SimplifiedTourResponse;
import com.project.booktour.responses.TourListResponse;
import com.project.booktour.responses.TourResponse;
import com.project.booktour.services.tour.ITourService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;

@RestController
@RequestMapping("${api.prefix}/tours")
@RequiredArgsConstructor
public class TourController {
    private static final Logger logger = LoggerFactory.getLogger(TourController.class);
    private final ITourService tourService;
    private final ObjectMapper objectMapper;

    @GetMapping("")
    public ResponseEntity<?> getTours(@RequestParam Map<String, String> params) {
        try {
            logger.info("Received request to get tours with params: {}", params);

            // Lấy page và limit, mặc định page=0, limit=10
            int page = Integer.parseInt(params.getOrDefault("page", "0"));
            int limit = Integer.parseInt(params.getOrDefault("limit", "10"));

            if (page < 0 || limit <= 0) {
                return ResponseEntity.badRequest().body("Page must be >= 0 and limit must be > 0");
            }

            // Lấy tham số tìm kiếm và sắp xếp
            String title = params.get("title");
            String sortBy = params.getOrDefault("sortBy", "createdAt");
            String sortDir = params.getOrDefault("sortDir", "desc");

            // Validate sortBy
            List<String> validSortFields = List.of("createdAt", "priceAdult");
            if (!validSortFields.contains(sortBy)) {
                return ResponseEntity.badRequest().body("Invalid sortBy field: " + sortBy + ". Must be 'createdAt' or 'priceAdult'");
            }

            // Validate sortDir
            if (!sortDir.equalsIgnoreCase("asc") && !sortDir.equalsIgnoreCase("desc")) {
                return ResponseEntity.badRequest().body("sortDir must be 'asc' or 'desc'");
            }

            Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
            PageRequest pageRequest = PageRequest.of(page, limit, sort);
            Double priceMin = params.containsKey("priceMin") ? Double.parseDouble(params.get("priceMin")) : null;
            Double priceMax = params.containsKey("priceMax") ? Double.parseDouble(params.get("priceMax")) : null;
            String region = params.get("region");
            Float starRating = params.containsKey("starRating") ? Float.parseFloat(params.get("starRating")) : null;
            String duration = params.get("duration");

            // Validate tham số bộ lọc
            if (priceMin != null && priceMin < 0) {
                return ResponseEntity.badRequest().body("priceMin must be >= 0");
            }
            if (priceMax != null && priceMax < 0) {
                return ResponseEntity.badRequest().body("priceMax must be >= 0");
            }
            if (priceMin != null && priceMax != null && priceMin > priceMax) {
                return ResponseEntity.badRequest().body("priceMin must be <= priceMax");
            }
            if (starRating != null && (starRating < 0 || starRating > 5)) {
                return ResponseEntity.badRequest().body("starRating must be between 0 and 5");
            }
            if (region != null) {
                try {
                    Region.valueOf(region.toUpperCase());
                } catch (IllegalArgumentException e) {
                    return ResponseEntity.badRequest().body("Invalid region: " + region);
                }
            }

            // Gọi TourService với các tham số bộ lọc và tìm kiếm
            Page<SimplifiedTourResponse> tourPage = tourService.getAllTours(pageRequest, priceMin, priceMax, region, starRating, duration, title);
            int totalPages = tourPage.getTotalPages();
            List<SimplifiedTourResponse> tours = tourPage.getContent();
            return ResponseEntity.ok(TourListResponse.builder()
                    .tours(tours)
                    .totalPages(totalPages)
                    .build());
        } catch (NumberFormatException e) {
            logger.error("Invalid number format for parameters: {}", params, e);
            return ResponseEntity.badRequest().body("Invalid number format for parameters: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Error while fetching tours: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error: " + e.getMessage());
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getTourResponseById(@PathVariable("id") Long tourId) {
        try {
            TourResponse tourResponse = tourService.getTourDetails(tourId);
            return ResponseEntity.ok(tourResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tour not found with id: " + tourId);
        }
    }
    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get("uploads/" + imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notfound.jpeg").toUri()));
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createTour(@Valid @RequestBody TourDTO tourDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Tour newTour = tourService.createTour(tourDTO);
            TourResponse tourResponse = tourService.getTourDetails(newTour.getTourId());
            return ResponseEntity.status(HttpStatus.CREATED).body(tourResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create tour: " + e.getMessage());
        }
    }

    @PostMapping(value = "uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(
            @PathVariable("id") Long tourId,
            @RequestParam("files") List<MultipartFile> files) {
        try {
            if (files == null || files.isEmpty()) {
                return ResponseEntity.badRequest().body("No files uploaded");
            }

            Tour existingTour = tourService.getTourById(tourId);
            List<TourImage> tourImages = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.getSize() == 0) {
                    continue;
                }
                if (file.getSize() > 10 * 1024 * 1024) { // 10MB
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body("File is too large! Maximum size is 10MB");
                }
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body("File must be an image");
                }

                String fileName = storeFile(file);
                TourImage tourImage = tourService.createTourImage(
                        existingTour.getTourId(),
                        TourImageDTO.builder().imageUrl(fileName).build()
                );
                tourImages.add(tourImage);
            }
            return ResponseEntity.ok(tourImages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to upload images: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable Long id) {
        try {
            tourService.deleteTour(id);
            return ResponseEntity.ok(String.format("Tour with id = %d deleted successfully", id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Tour not found with id: " + id);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTour(
            @PathVariable("id") Long id,
            @Valid @RequestBody TourDTO tourDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Tour updatedTour = tourService.updateTour(id, tourDTO);
            if (updatedTour == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Tour not found with id: " + id);
            }
            // Sử dụng getTourDetails để lấy TourResponse đầy đủ (bao gồm imageUrls)
            TourResponse tourResponse = tourService.getTourDetails(updatedTour.getTourId());
            return ResponseEntity.ok(tourResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to update tour: " + e.getMessage());
        }
    }

    private String storeFile(MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFilename = UUID.randomUUID().toString() + "-" + filename;
        if (!isImage(file)) {
            throw new IllegalArgumentException("The file is not an image.");
        }
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    private boolean isImage(MultipartFile file) throws IOException {
        Tika tika = new Tika();
        String mimeType = tika.detect(file.getInputStream());
        return mimeType.startsWith("image/");
    }
}