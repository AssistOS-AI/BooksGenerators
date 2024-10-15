const llmModule=require("assistos").loadModule("llm", {});

export class BooksGeneratorTemplateModal{
    constructor(element, invalidate){
        this.element=element;
        this.invalidate = invalidate;
        this.invalidate();
    }
    async beforeRender(){}
    async afterRender(){}

    async closeModal(_target){
        await assistOS.UI.closeModal(_target);
    }

    async generateBookTemplate(_target){
        const formData = await assistOS.UI.extractFormInformation(_target);
        if(!formData.isValid){
            return assistOS.UI.showApplicationError("Invalid form data", "Please fill all the required fields", "error");
        }
        const bookData = formData.data;
        const prompt =
            `Generate a book with title ${bookData.title} edition ${bookData.edition}. 
             Details:
             Number of chapters: ${bookData.chapters}. Special instructions: ${bookData.instructions}`;

        const reqData={
            modelName: "GPT-4o",
            prompt: prompt
        }
        const llmResponse= await llmModule.sendLLMRequest(reqData);
        const generatedBook=llmResponse.messages;
    }

}