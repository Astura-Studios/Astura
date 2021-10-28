export class ExtendedString extends String {
    public capitalize(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1); 
    };
};