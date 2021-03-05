export interface EssayDataEntry {
    supertitle?: string;
    title: string;
    essayPath: string;
    author: string;
    posterPath?: string;
    videoPath?: string;
    smallVideoPath?: string;
    publicationDate: string;
    affiliation?: string;
    hvtID?: string;
    aviaryLink?: string;
}

export const essays: {
    [essayID: string]: EssayDataEntry;
} = {
    "hvt-3280": {
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3280/background-loop-1280.mp4",
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3280/background-loop-640.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3280/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/3328/transcript?",
        supertitle: "Introduction to the testimony of",
        hvtID: "3280",
        title: "Liubov’ Naumovna Krasilovskaia",
        author: "Sarah Garibova",
        affiliation: "Boston University",
        essayPath: "/data/intro-hvt-3280.json",
        publicationDate: "February 1, 2021",
    },
    "hvt-0237": {
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background-loop-1280.mp4",
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background-loop-640.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/307/transcript?",
        supertitle: "Introduction to the testimony of",
        hvtID: "0237",
        title: "Martha Saraffian",
        author: "Nikolaus Hagen",
        affiliation: "Innsbruck",
        essayPath: "/data/intro-hvt-0237.json",
        publicationDate: "February 1, 2021",
    },
    "hvt-2033": {
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/2033/background-loop-1280.mp4",
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/2033/background-loop-640.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/2033/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/2097/transcript?",
        supertitle: "Introduction to the testimony of",
        hvtID: "2033",
        title: "Esther Fox",
        author: "Sari Siegel",
        affiliation: "Cedars-Sinai Medical Center/UCLA",
        essayPath: "/data/intro-hvt-2033.json",
        publicationDate: "February 1, 2021",
    },
    "hvt-0170": {
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background-loop-640.mp4",
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background-loop-1280.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/241/transcript?",
        supertitle: "Introduction to the testimony of",
        title: "Hans Frei",
        hvtID: "0170",
        author: "Ion Popa",
        affiliation: "Universityof Manchester",
        essayPath: "/data/intro-hvt-0170.json",
        publicationDate: "February 1, 2021",
    },
    "hvt-3169": {
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3169/background-loop-640.mp4",
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3169/background-loop-1280.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3169/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/3219/transcript?",
        hvtID: "3169",
        supertitle: "Introduction to the testimony of",
        title: "Władysława Zawistowska",
        author: "Paweł Machcewicz",
        affiliation: "Institute of Political Studies of the Polish Academy of Science",
        essayPath: "/data/intro-hvt-3169.json",
        publicationDate: "February 1, 2021",

    },
    "hvt-3164": {
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3164/background-loop-640.mp4",
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3164/background-loop-1280.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3164/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/3214/transcript?",
        hvtID: "3164",
        supertitle: "Introduction to the testimony of",
        title: "Helena Balicka-Zwolińska",
        author: "Anna Machcewicz",
        affiliation: "Institute of Political Studies of the Polish Academy of Sciences",
        essayPath: "/data/intro-hvt-3164.json",
        publicationDate: "February 1, 2021",

    },
    "hvt-0764": {
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0764/background-loop-640.mp4",
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0764/background-loop-1280.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0764/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/830/transcript?",
        hvtID: "0764",
        supertitle: "Introduction to the testimony of",
        title: "Gerhart M. Riegner",
        author: "Gil Rubin",
        affiliation: "Yale University",
        essayPath: "/data/intro-hvt-0764.json",
        publicationDate: "February 1, 2021",
    },
    "hvt-3038": {
        smallVideoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3038/background-loop-640.mp4",
        videoPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3038/background-loop-1280.mp4",
        posterPath: "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3038/poster.jpg",
        aviaryLink: "https://fortunoff.aviaryplatform.com/collections/5/collection_resources/3091/transcript?",
        hvtID: "3038",
        supertitle: "Introduction to the testimony of",
        title: "Rubin Pinsker",
        author: "Glenn Dynner",
        affiliation: "Sarah Lawrence College",
        essayPath: "/data/intro-hvt-3038.json",
        publicationDate: "February 1, 2021"
    }
};

// set to undefined to use default object order
export const essayOrder = [
    "hvt-2033", // Fox
    "hvt-0170", // Frei
    "hvt-3280",  // Krasilovskaia
    "hvt-3038", // Pinsker
    "hvt-0764", // Riegner
    "hvt-0237", // Saraffian
    "hvt-3169", // Zawistowska
    "hvt-3164", // Zwolinska
]