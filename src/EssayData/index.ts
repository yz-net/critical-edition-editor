export interface EssayDataEntry {
    supertitle?: string;
    title: string;
    essayPath: string;
    author: string;
    posterPath?: string;
    videoPath?: string;
    publicationDate: string;
    affiliation?: string;
    hvtID: string;

}

export const essays: {
    [essayID: string]: EssayDataEntry;
} = {
    "hvt-3280": {
        supertitle: "Introduction to the testimony of",
        hvtID: "3280",
        title: "Liubov’ Naumovna Krasilovskaia",
        author: "Sarah Garibova",
        affiliation: "Boston University",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/web-liubov-loop.mov",
        essayPath: "/data/intro-hvt-3280.json",
        publicationDate: "February 1, 2021",
    },
    "hvt-0237": {
        supertitle: "Introduction to the testimony of",
        hvtID: "0237",
        title: "Martha Saraffian",
        author: "Nikolaus Hagen",
        affiliation: "Innsbruck",
        essayPath: "/data/intro-hvt-0237.json",
        posterPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background.png",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background-loop.mp4",
        publicationDate: "February 1, 2021",
    },
    "hvt-2033": {
        supertitle: "Introduction to the testimony of",
        hvtID: "2033",
        title: "Esther Fox",
        author: "Sari Siegel",
        affiliation: "Cedars-Sinai Medical Center/UCLA",
        essayPath: "/data/intro-hvt-2033.json",
        publicationDate: "February 1, 2021",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/2033/background-loop.mp4",

    },
    "hvt-0170": {
        supertitle: "Introduction to the testimony of",
        title: "Hans Frei",
        hvtID: "0170",
        author: "Ion Popa",
        affiliation: "Universityof Manchester",
        essayPath: "/data/intro-hvt-0170.json",
        posterPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background.png",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background-loop.mp4",
        publicationDate: "February 1, 2021",
    },
    "hvt-3169": {
        hvtID: "3169",
        supertitle: "Introduction to the testimony of",
        title: "Władysława Zawistowska",
        author: "Paweł Machcewicz",
        affiliation: "Institute of Political Studies of the Polish Academy of Science",
        essayPath: "/data/intro-hvt-3169.json",
        publicationDate: "February 1, 2021",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3169/background-loop.mp4",

    },
    "hvt-3164": {
        hvtID: "3164",
        supertitle: "Introduction to the testimony of",
        title: "Helena Balicka-Zwolińska",
        author: "Anna Machcewicz",
        affiliation: "Institute of Political Studies of the Polish Academy of Sciences",
        essayPath: "/data/intro-hvt-3164.json",
        publicationDate: "February 1, 2021",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3164/background-loop.mp4",

    },
    "hvt-0764": {
        hvtID: "0764",
        supertitle: "Introduction to the testimony of",
        title: "Gerhart M. Riegner",
        author: "Gil Rubin",
        affiliation: "Yale University",
        essayPath: "/data/intro-hvt-0764.json",
        posterPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0764/background.png",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/hvt-0764-background-loop.mp4",
        publicationDate: "February 1, 2021",
    },
    "hvt-3038": {
        hvtID: "3038",
        supertitle: "Introduction to the testimony of",
        title: "Rubin Pinsker",
        author: "Glenn Dynner",
        affiliation: "Sarah Lawrence College",
        essayPath: "/data/intro-hvt-3038.json",
        publicationDate: "February 1, 2021"
    }
};