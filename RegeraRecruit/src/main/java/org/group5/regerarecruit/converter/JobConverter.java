package org.group5.regerarecruit.converter;

import java.util.ArrayList;
import java.util.List;

import org.group5.regerarecruit.dto.CityDTO;
import org.group5.regerarecruit.dto.JobDTO;
import org.group5.regerarecruit.dto.TagDTO;
import org.group5.regerarecruit.dto.request.job.JobCreationRequest;
import org.group5.regerarecruit.dto.request.job.JobUpdateRequest;
import org.group5.regerarecruit.entity.City;
import org.group5.regerarecruit.entity.Job;
import org.group5.regerarecruit.entity.Tag;
import org.group5.regerarecruit.enums.OpenStatus;
import org.group5.regerarecruit.repository.CityRepository;
import org.group5.regerarecruit.repository.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JobConverter {
    public final ModelMapper modelMapper;
    private final OtherConverter otherConverter;
    private final TagRepository tagRepository;
    private final CityRepository cityRepository;

    public JobDTO toDTO(Job job) {
        JobDTO jobDTO = modelMapper.map(job, JobDTO.class);

        List<CityDTO> cities =
                job.getCities().stream().map(otherConverter::toDTO).toList();
        jobDTO.setCityDTOList(cities);

        List<TagDTO> tags = job.getTags().stream().map(otherConverter::toDTO).toList();
        jobDTO.setTagDTOList(tags);

        return jobDTO;
    }

    public Job toJobEntity(JobCreationRequest request) {
        Job job = modelMapper.map(request, Job.class);
        List<Tag> tagList = new ArrayList<>();
        List<City> cityList = new ArrayList<>();

        for (Long i : request.getTags()) {
            tagList.add(tagRepository.getReferenceById(i));
        }
        job.setTags(tagList);

        for (Long i : request.getCities()) {
            cityList.add(cityRepository.getReferenceById(i));
        }
        job.setCities(cityList);
        job.setOpenStatus(OpenStatus.valueOf(request.getOpenStatus()));

        return job;
    }

    public Job toJobEntity(JobUpdateRequest request) {
        Job job = modelMapper.map(request, Job.class);

        if (request.getOpenStatus() != null) {
            job.setOpenStatus(OpenStatus.valueOf(request.getOpenStatus()));
        }

        if (request.getCities() != null) {
            List<City> cityList = new ArrayList<>();
            for (Long i : request.getCities()) {
                cityList.add(cityRepository.getReferenceById(i));
            }
            job.setCities(cityList);
        }

        if (request.getTags() != null) {
            List<Tag> tagList = new ArrayList<>();
            for (Long i : request.getTags()) {
                tagList.add(tagRepository.getReferenceById(i));
            }
            job.setTags(tagList);
        }

        return job;
    }
}
