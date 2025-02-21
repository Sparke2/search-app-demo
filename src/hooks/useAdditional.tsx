export const useAdditional = (name: string): string | 'absent' => {
    const urlParams = new URLSearchParams(window.location.search);
    const additionals = urlParams.get('additionals');

    if (!additionals) {
        return 'absent';
    }

    const params = additionals.split(',');
    const paramValue = params.find(param => param === name);
    return paramValue ? paramValue : 'absent';
};
