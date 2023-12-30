export const handleUrl = (filename: string | undefined) => {
    console.log('FILENAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',filename)
    return `http://localhost:3000/images/${filename}`
}