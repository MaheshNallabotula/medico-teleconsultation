package com.medico.app.extras;

import com.medico.app.extras.dto.StartupDto;
import com.medico.app.services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/aux")
public class AuxController {

    private final AuxService auxService;
    private final EmailService emailService;

    public AuxController(AuxService auxService, EmailService emailService) {
        this.auxService = auxService;
        this.emailService = emailService;
    }


    @PostMapping(path = "/startup")
    public ResponseEntity<?> startup(@RequestBody StartupDto startupDto){
        this.auxService.startup(startupDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/sendMail")
    public ResponseEntity<?> sendMail(){
        return new ResponseEntity<>(emailService.sendEmail("sumitpaliya9087@gmail.com", "Test", "Tezas Bhadwa"), HttpStatus.OK);
    }

}
