import { useMutation } from '@tanstack/react-query';
import { AnalyzedDelineation, DelineationRequest } from '@app/models/DelineationModel';
import { ecrRepository } from '@app/io/repositories/ECRRepository';
import type { DefaultError } from '@tanstack/query-core';

export const useParseDelineation = (onSuccess: (data: AnalyzedDelineation) => void) => {
    return useMutation<AnalyzedDelineation, DefaultError, DelineationRequest>({
        mutationFn: (data) => {
            return ecrRepository.parseDelineation(data);
        },
        onSuccess,
    });
};
