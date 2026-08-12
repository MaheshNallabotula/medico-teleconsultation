package com.medico.app.controllers;

import com.medico.app.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/filesaws")
public class StorageController {

    @Autowired
    private StorageService storageService;;

//    @PostMapping(path = "/uploadfiles")
//    public ResponseEntity<?> uploadFile(@RequestParam(value = "file") MultipartFile file) {
//        return new ResponseEntity<>(storageService.uploadFile(file, filename),HttpStatus.OK);
//    }

    @GetMapping(path = "/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = storageService.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
}
