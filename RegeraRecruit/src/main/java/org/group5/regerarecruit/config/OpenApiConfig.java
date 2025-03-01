package org.group5.regerarecruit.config;

import java.util.List;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI(
            @Value("${open.api.title}") String title,
            @Value("${open.api.version}") String version,
            @Value("${open.api.description}") String description,
            @Value("${open.api.serverName}") String serverName,
            @Value("${open.api.serverUrl}") String serverUrl) {

        return new OpenAPI()
                .info(new Info()
                        .title(title)
                        .version(version)
                        .description(description)
                        .license(new License().name("API license").url("http://domain.com")))
                .servers(List.of(new Server().url(serverUrl).description(serverName)));
        //                .components(new Components()
        //                        .addSecuritySchemes(
        //                                "bearerAuth",
        //                                new SecurityScheme()
        //                                        .type(SecurityScheme.Type.HTTP)
        //                                        .scheme("bearer")
        //                                        .bearerFormat("JWT")))
        //                .security(List.of(new SecurityRequirement().addList("bearerAuth")));
    }

    @Bean
    public GroupedOpenApi adminApiGroup() {
        return GroupedOpenApi.builder()
                .group("admin-service-api")
                .packagesToScan("org.group5.regerarecruit.controller.admin")
                .build();
    }

    @Bean
    public GroupedOpenApi candidateApiGroup() {
        return GroupedOpenApi.builder()
                .group("candidate-service-api")
                .packagesToScan("org.group5.regerarecruit.controller.candidate")
                .build();
    }

    @Bean
    public GroupedOpenApi companyApiGroup() {
        return GroupedOpenApi.builder()
                .group("company-service-api")
                .packagesToScan("org.group5.regerarecruit.controller.company")
                .build();
    }

    @Bean
    public GroupedOpenApi authenticationApiGroup() {
        return GroupedOpenApi.builder()
                .group("authentication-service-api")
                .packagesToScan("org.group5.regerarecruit.controller.authentication")
                .build();
    }

    @Bean
    public GroupedOpenApi notificationApiGroup() {
        return GroupedOpenApi.builder()
                .group("notification-service-api")
                .packagesToScan("org.group5.regerarecruit.controller.notification")
                .build();
    }

    @Bean
    public GroupedOpenApi publicApiGroup() {
        return GroupedOpenApi.builder()
                .group("public-service-api")
                .packagesToScan("org.group5.regerarecruit.controller.public_api")
                .build();
    }
}
