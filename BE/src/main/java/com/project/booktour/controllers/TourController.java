package com.project.booktour.controllers;

import com.github.javafaker.Faker;
import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.responses.TourListResponse;
import com.project.booktour.responses.TourResponse;
import com.project.booktour.services.tour.ITourService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
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
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/tours")
@RequiredArgsConstructor
public class TourController {
    private final ITourService tourService;

    @GetMapping("")
    public ResponseEntity<TourListResponse> getTours(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<TourResponse> tourPage = tourService.getAllTours(pageRequest);

        int totalPages = tourPage.getTotalPages();
        List<TourResponse> tours = tourPage.getContent();
        return ResponseEntity.ok(TourListResponse.builder()
                .tours(tours)
                .totalPages(totalPages)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTourById(@PathVariable("id") Long tourId) {
        try {
            Tour existingTour = tourService.getTourById(tourId);
            return ResponseEntity.ok(TourResponse.fromTour(existingTour));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createTour(@Valid @RequestBody TourDTO tourDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Tour newTour = tourService.createTour(tourDTO);
            return ResponseEntity.ok(newTour);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(value = "uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@PathVariable("id") Long tourId,
                                         @RequestParam("files") List<MultipartFile> files) {
        try {
            Tour existingTour = tourService.getTourById(tourId);
            if (files == null || files.isEmpty()) {
                return ResponseEntity.badRequest().body("No files uploaded");
            }
            if (files.size() > 5) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("You can only upload up to 5 images at a time");
            }
            List<TourImage> tourImages = new ArrayList<>();
            for (MultipartFile file : files) {
                if (file.getSize() == 0) {
                    continue;
                }
                if (file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body("File is too large! Maximum size is 10MB");
                }
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body("File must be an image");
                }
                String fileName = storeFile(file);
                TourImage tourImage = tourService.createTourImage(existingTour.getTourId(),
                        TourImageDTO.builder().imageUrl(fileName).build());
                tourImages.add(tourImage);
            }
            return ResponseEntity.ok().body(tourImages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTour(@PathVariable Long id) {
        try {
            tourService.deleteTour(id);
            return ResponseEntity.ok(String.format("Tour with id = %d deleted successfully", id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTour(@PathVariable("id") Long id, @RequestBody TourDTO tourDTO) {
        try {
            Tour updatedTour = tourService.updateTour(id, tourDTO);
            return ResponseEntity.ok(updatedTour);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //    @PostMapping("/generateFakeTours")
    private ResponseEntity<String> generateFakeTours() {
        Faker faker = new Faker();
        for (int i = 0; i < 1000; i++) { // Giảm số lượng để tránh quá tải
            String tourTitle = faker.lorem().sentence(3);
            if (tourService.existsByTitle(tourTitle)) {
                continue;
            }
            TourDTO tourDTO = TourDTO.builder()
                    .title(tourTitle)
                    .priceAdult(faker.number().randomDouble(2, 1000000, 10000000))
                    .priceChild(faker.number().randomDouble(2, 500000, 5000000))
                    .image("")
                    .quantity(faker.number().numberBetween(5, 50))
                    .description(faker.lorem().paragraph())
                    .duration(faker.number().numberBetween(1, 7) + " ngày")
                    .destination(faker.address().city())
                    .availability(true)
                    .itinerary(faker.lorem().paragraph())
                    .reviews(faker.lorem().sentence())
                    .build();
            try {
                tourService.createTour(tourDTO);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.ok().body("Fake tours created successfully");
    }
}