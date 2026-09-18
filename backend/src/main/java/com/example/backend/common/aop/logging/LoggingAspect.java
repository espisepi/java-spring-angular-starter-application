package com.example.backend.common.aop.logging;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    private final ObjectMapper objectMapper;

    public LoggingAspect(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Pointcut("execution(public * com.example.backend.features.example..web..*(..))"
            + " || execution(public * com.example.backend.features.example..facade..*(..))")
    public void itemCrudOperations() {
    }

    @Around("itemCrudOperations()")
    public Object logOperation(ProceedingJoinPoint joinPoint) throws Throwable {
        String operation = joinPoint.getSignature().toShortString();
        long startTime = System.nanoTime();

        logger.info("START {} args={}", operation, safeToJson(joinPoint.getArgs()));

        try {
            Object result = joinPoint.proceed();
            long durationMs = elapsedMilliseconds(startTime);
            logger.info("SUCCESS {} durationMs={} response={}", operation, durationMs, safeToJson(result));
            return result;
        } catch (Throwable exception) {
            long durationMs = elapsedMilliseconds(startTime);
            logger.error("FAILURE {} durationMs={} exception={} message={}",
                    operation, durationMs, exception.getClass().getName(), exception.getMessage(), exception);
            throw exception;
        }
    }

    private long elapsedMilliseconds(long startTime) {
        return (System.nanoTime() - startTime) / 1_000_000;
    }

    private String safeToJson(Object value) {
        if (value == null) {
            return "null";
        }

        try {
            ObjectMapper mapper = objectMapper.copy();
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

            SimpleModule module = new SimpleModule();
            module.addSerializer(byte[].class, new JsonSerializer<byte[]>() {
                @Override
                public void serialize(byte[] bytes, JsonGenerator generator, SerializerProvider provider)
                        throws IOException {
                    generator.writeString("[hidden]");
                }
            });
            mapper.registerModule(module);
            return mapper.writeValueAsString(value);
        } catch (Exception serializationException) {
            logger.warn("Could not serialize logging value of type {}: {}",
                    value.getClass().getName(), serializationException.getMessage());
            return "[non-serializable: " + value.getClass().getSimpleName() + "]";
        }
    }
}