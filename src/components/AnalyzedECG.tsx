import React from 'react';
import { useStyles } from '@app/hooks/useStyles';
import { css } from '@emotion/css';
import { AnalyzedDelineation } from '@app/models/DelineationModel';
import { Dimensions } from '@app/theme/Dimensions';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

/**
 * Component props
 */
type AnalyzedECGProps = {
    analysis: AnalyzedDelineation;
};

/**
 * AnalyzedECG
 * React Functional Component
 *
 */
export const AnalyzedECG: React.FC<AnalyzedECGProps> = ({ analysis }) => {
    const styles = useStyles(makeStyles);

    return (
        <div className={styles.container}>
            <MeasuresStats analysis={analysis} />
            <HeartRateStats analysis={analysis} />
        </div>
    );
};

const MeasuresStats: React.FC<AnalyzedECGProps> = ({ analysis }) => {
    const { t } = useTranslation();
    const styles = useStyles(makeStyles);

    return (
        <Card>
            <CardHeader title={t('analysis.measures')} />

            <CardContent className={styles.content}>
                <Typography>
                    {t('analysis.startDate')}: {DateTime.fromISO(analysis.startDate).toLocaleString(DateTime.DATETIME_MED)}
                </Typography>
                <Typography>
                    {t('analysis.endDate')}: {DateTime.fromISO(analysis.endDate).toLocaleString(DateTime.DATETIME_MED)}
                </Typography>
                <Typography>
                    {t('analysis.total')}: {analysis.measures.total}
                </Typography>
                valid / invalid
                <Typography>
                    {t('analysis.valid')}: {analysis.measures.valid}
                </Typography>
                <Typography>
                    {t('analysis.invalid')}: {analysis.measures.invalid}
                </Typography>
            </CardContent>
        </Card>
    );
};

const HeartRateStats: React.FC<AnalyzedECGProps> = ({ analysis }) => {
    const { t } = useTranslation();
    const styles = useStyles(makeStyles);

    return (
        <Card>
            <CardHeader title={t('analysis.heartRate')} />

            <CardContent className={styles.content}>
                <Typography>
                    {t('analysis.meanHeartRate')}: {analysis.meanHeartRate.toFixed(0)} bpm
                </Typography>
                <div>
                    <Typography>
                        {t('analysis.highestHeartRate')}: {analysis.highestHeartRate.value.toFixed(0)} bpm
                    </Typography>
                    <Typography variant='caption'>
                        {DateTime.fromISO(analysis.highestHeartRate.startDate).toLocaleString(DateTime.DATETIME_MED)}
                    </Typography>
                </div>
                <div>
                    <Typography>
                        {t('analysis.lowestHeartRate')}: {analysis.lowestHeartRate.value.toFixed(0)} bpm
                    </Typography>
                    <Typography variant='caption'>
                        {DateTime.fromISO(analysis.lowestHeartRate.startDate).toLocaleString(DateTime.DATETIME_MED)}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};

const makeStyles = () => ({
    container: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: ${Dimensions['8']};
    `,
    content: css`
        display: flex;
        min-width: 300px;
        flex-direction: column;
        gap: ${Dimensions['4']};
    `,
});
