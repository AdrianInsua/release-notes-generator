import inquirer from 'inquirer';

export const requireToken = async (defaultToken: string): Promise<string> => {
    const { token } = await inquirer.prompt([
        {
            name: 'token',
            message: `Enter your acces token. If empty we'll use env (${defaultToken}) or config. token: `,
            type: 'password',
        },
    ]);

    return token;
};

export const requireRepo = async (defaultRepo: string): Promise<string> => {
    const { repo } = await inquirer.prompt([
        {
            name: 'repo',
            message: 'Repo name in format user/repo: ',
            default: defaultRepo,
            type: 'input',
        },
    ]);

    return repo;
};

const confirmMessage = async (customConfig: { message: string }) => {
    const { response } = await inquirer.prompt([
        {
            name: 'response',
            type: 'confirm',
            ...customConfig,
        },
    ]);

    return response;
};

export const confirmPublish = (): Promise<boolean> => {
    return confirmMessage({
        message: 'Do you want to publish your RELEASE-NOTES?',
    });
};

export const confirmPublishAssets = (): Promise<boolean> => {
    return confirmMessage({
        message: 'Do you want to publish your asset files?',
    });
};

export const confirmPullRequestLabeling = (): Promise<boolean> => {
    return confirmMessage({
        message: 'Do you want to label pull requests with in-release-note label?',
    });
};
