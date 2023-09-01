package com.example.azubiquiz.service;

import com.example.azubiquiz.entity.Antwort;
import com.example.azubiquiz.entity.Frage;
import com.example.azubiquiz.entity.Test;
import com.example.azubiquiz.repository.AntwortRepository;
import com.example.azubiquiz.repository.FrageRepository;
import com.example.azubiquiz.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TestService {
    private final TestRepository testRepository;
    private final FrageRepository frageRepository;
    private final AntwortRepository antwortRepository;

    public List<Test> selectAllTest() {
        return testRepository.findAll();
    }

    public Test selectTest(Long id) throws Exception {
        return testRepository.findById(id).orElseThrow(() -> new Exception("Test nicht gefunden"));
    }

    public Test createTest(Test test) throws Exception {
        Test testNew = testRepository.saveAndFlush(test);

        for (Frage frage : test.getFragen()) {
            frage.setTest(testNew);
            Frage frageNew = frageRepository.saveAndFlush(frage);
            for (Antwort antwort : frage.getAntworten()) {
                antwort.setFrage(frageNew);
                antwortRepository.saveAndFlush(antwort);
            }
        }

        return testRepository.findById(testNew.getId()).orElseThrow(() -> new Exception("Test konnte nicht gespeichert werden"));
    }

    public Test updateTest(Test testData, Long id) throws Exception {
        return testRepository.findById(id)
                .map(test -> {
                    test.setVersion(test.getVersion() + 1);
                    test.setName(testData.getName());
                    test.setBeschreibung(testData.getBeschreibung());
                    test.setFragen(testData.getFragen());
                    return testRepository.save(test);
                })
                .orElseThrow(() -> new Exception("Test nicht gefunden"));
    }

    public Test deleteTest(Long id) throws Exception {
        Test test = testRepository.findById(id).orElseThrow(() -> new Exception("Test nicht gefunden"));

        testRepository.deleteById(id);

        return test;
    }
}
