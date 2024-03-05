export default {
    methods: {
        checkField(p) {
            let noSpaces = p.trim()
            return (noSpaces !== undefined && noSpaces !== null && noSpaces !== '') ? true : false
        }
    }
}