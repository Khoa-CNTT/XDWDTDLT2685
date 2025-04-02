package com.project.booktour.exceptions;

public class PermissionDenyException extends Exception {
    // Constructor nhận thông báo lỗi và truyền vào lớp cha Exception
    public PermissionDenyException(String message) {
        super(message);
    }
}
