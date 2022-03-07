import { AwsConfig, } from "./dto/utils.dto";

export let getAwsCred = (): AwsConfig => {
    let AwsConfig: AwsConfig = { region: process.env.AWS_REGION };
    return AwsConfig;
};