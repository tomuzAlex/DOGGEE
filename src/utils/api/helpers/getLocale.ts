
export const POSSIBLE_LOCATIONS = ['ru', 'en-US'];
export const DEFAULT_LOCATION = POSSIBLE_LOCATIONS[0] as 'ru' | 'en-US';

export const getLocale = (): 'ru' | 'en-US' => {
    if (POSSIBLE_LOCATIONS.find((local) => local === navigator.language)) {
        return navigator.language as 'ru' | 'en-US';
    };
    
    return DEFAULT_LOCATION;
}
