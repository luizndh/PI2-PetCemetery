package com.petcemetery.petcemetery.exceptions;

import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorMessage> tratarErro422(IllegalArgumentException e) {
        ApiErrorMessage error = new ApiErrorMessage(422, e.getMessage());
        return ResponseEntity.status(error.getCodigo()).body(error);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiErrorMessage> tratarErro404(NoSuchElementException e) {
        ApiErrorMessage error = new ApiErrorMessage(404, e.getMessage());
        return ResponseEntity.status(error.getCodigo()).body(error);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiErrorMessage> tratarErro500(RuntimeException e) {
        ApiErrorMessage error = new ApiErrorMessage(500, e.getMessage());
        return ResponseEntity.status(error.getCodigo()).body(error);
    }
}
