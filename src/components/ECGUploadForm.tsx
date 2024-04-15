import React from 'react';
import { useStyles } from '@app/hooks/useStyles';
import { css } from '@emotion/css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ECGUpload, ecgUploadSchema } from '@app/components/ECGUpload.schema';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardActions, CardContent, Input } from '@mui/material';
import { AnalyzedDelineation } from '@app/models/DelineationModel';
import { useParseDelineation } from '@app/hooks/useDelineation';

/**
 * Component props
 */
type ECGUploadFormProps = {
    className?: string;
    setECG: React.Dispatch<React.SetStateAction<AnalyzedDelineation | undefined>>;
};

/**
 * ECGUploadForm
 * React Functional Component
 *
 */
export const ECGUploadForm: React.FC<ECGUploadFormProps> = ({ className, setECG }) => {
    const { t } = useTranslation();
    const styles = useStyles(makeStyles);
    const formContext = useForm<ECGUpload>({
        resolver: zodResolver(ecgUploadSchema),
    });
    const parseECG = useParseDelineation(setECG);

    const handleSubmit = formContext.handleSubmit((data) => {
        parseECG.mutate({
            file: data.file[0],
            startDate: data.startDate,
        });
    });

    return (
        <form onSubmit={handleSubmit} className={className}>
            <Card>
                <CardContent className={styles.content}>
                    <Input
                        type='file'
                        {...formContext.register('file', { required: true })}
                        error={formContext.formState.errors.file !== undefined}
                    />
                    <Input type='datetime-local' {...formContext.register('startDate', { required: false })} />
                </CardContent>
                <CardActions>
                    <Button type='submit' variant='contained'>
                        {t('ecgUpload.send')}
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

const makeStyles = () => ({
    content: css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `,
});
