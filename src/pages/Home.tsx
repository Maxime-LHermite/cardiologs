import React, { useState } from 'react';
import { ECGUploadForm } from '@app/components/ECGUploadForm';
import { css } from '@emotion/css';
import { useStyles } from '@app/hooks/useStyles';
import { Dimensions } from '@app/theme/Dimensions';
import { useParseDelineation } from '@app/hooks/useDelineation';
import { AnalyzedDelineation } from '@app/models/DelineationModel';
import { AnalyzedECG } from '@app/components/AnalyzedECG';

/**
 * Home
 * React Functional Component
 *
 */
export const Home: React.FC = () => {
    const styles = useStyles(makeStyles);
    const [analyzeECG, setAnalyzedECG] = useState<AnalyzedDelineation>();

    return (
        <main>
            <ECGUploadForm className={styles.uploadForm} setECG={setAnalyzedECG} />
            {analyzeECG && <AnalyzedECG analysis={analyzeECG} />}
        </main>
    );
};

const makeStyles = () => ({
    container: css``,
    uploadForm: css`
        margin: ${Dimensions['8']} ${Dimensions['96']};
    `,
});
