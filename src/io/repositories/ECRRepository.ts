import { apiDataSource, ApiDataSourceSpec } from '@app/io/ApiDatasource';
import { AnalyzedDelineation, analyzedDelineationSchema, DelineationRequest } from '@app/models/DelineationModel';

export class ECRRepository {
    constructor(private readonly dataSource: ApiDataSourceSpec = apiDataSource) {}

    parseDelineation = async (data: DelineationRequest): Promise<AnalyzedDelineation> => {
        const body = new FormData();
        body.append('file', data.file);
        if (data.startDate) {
            body.append('startDate', data.startDate);
        }
        const result = await this.dataSource.post('/delineation', analyzedDelineationSchema, body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(result);
        return result;
    };
}

export const ecrRepository = new ECRRepository();
