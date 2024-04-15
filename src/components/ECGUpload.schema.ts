import { z } from 'zod';

const acceptedFileTypes = {
    'text/csv': undefined,
    'application/vnd.ms-excel': undefined,
};
export const ecgUploadSchema = z.object({
    startDate: z.string().optional(),
    file: z.any(z.instanceof(FileList)).refine((fileList: FileList) => fileList.length === 1 && fileList[0] && fileList[0].type in acceptedFileTypes),
});

export type ECGUpload = z.infer<typeof ecgUploadSchema>;
