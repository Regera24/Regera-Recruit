package org.group5.regerarecruit.repository.client;

import feign.QueryMap;
import org.group5.regerarecruit.dto.request.authentication.OutboundAuthenticationRequest;
import org.group5.regerarecruit.dto.response.authentication.OutboundAuthenticationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "outbound-regera", url = "https://oauth2.googleapis.com")
public interface OutboundRegeraClient {
    @PostMapping(value = "/token", produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OutboundAuthenticationResponse exchange(@QueryMap OutboundAuthenticationRequest request);
}
