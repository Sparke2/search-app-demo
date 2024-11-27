export const useAdditional = (name: string): boolean => {
    const urlParams = new URLSearchParams(window.location.search);
    const additionals = urlParams.get('additionals');
    return additionals ? additionals.split(',').includes(name) : false;
};
