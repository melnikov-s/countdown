import helloWorld from "../src";

test("Hello world!", () => {
	expect(helloWorld).toBe("hello world");
});
