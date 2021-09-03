import { EssayDataEntry } from "Data/EssayData";
import faker from "faker";

export default function fakeEssay(): EssayDataEntry {
    return {
        id: faker.datatype.uuid(),
        essayPath: faker.internet.url(),
        title: faker.lorem.sentence(),
        author: faker.name.firstName() + faker.name.lastName(),
        publicationDate: "",
    };
}
