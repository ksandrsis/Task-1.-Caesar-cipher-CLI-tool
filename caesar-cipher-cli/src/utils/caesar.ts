export {}

const parse = (text: string, shift: number): string => {
    return String.fromCharCode(
        ...text.split('').map((char) => {
            const s = shift % 26
            if (/[A-Z]/.test(char)){
                const ans = char.charCodeAt(0) + s
               return ans < 91 ? ans < 65 ? ans + 26 : ans: ans - 26
            }else if(/[a-z]/.test(char)){
                const ans = char.charCodeAt(0) + s
                return ans < 123 ? ans < 97 ? ans + 26 : ans: ans - 26
            }
            return char.charCodeAt(0)
        })
    );
};

exports.pasre = parse