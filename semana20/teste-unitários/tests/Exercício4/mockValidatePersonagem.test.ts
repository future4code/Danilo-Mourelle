//? Devemos criar um mock para a função que antigamente causava a dependencia. Neste caso devemos mockar a função validatePersonagem.

describe("Testing performAtackInvDep", () => {
    test("Mocking validatePersonagem when should be true", () => {
        const mock = jest.fn(() => {
            return true
        })
    })
    test("Mocking validatePersonagem when should be true", () => {
        const mock = jest.fn(() => {
            return false
        })
    })
})