export interface EssayDataEntry {
    supertitle?: string;
    title: string;
    essayPath: string;
    author: string;
    posterPath?: string;
    videoPath?: string;
    publicationDate: string;

    hvtID: string;

}

export const essays: {
    [essayID: string]: EssayDataEntry;
} = {
    krasilovskaia: {
        supertitle: "Introduction to the testimony of",
        hvtID: "3280",
        title: "Liubov’ Naumovna Krasilovskaia",
        author: "Sarah Garibova",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/web-liubov-loop.mov",
        essayPath: "/data/intro-hvt-3280.json",
        publicationDate: "February 1, 2021",
    },
    saraffian: {
        supertitle: "Introduction to the testimony of",
        hvtID: "0237",
        title: "Martha Saraffian",
        author: "Nikolaus Hagen",
        essayPath: "/data/intro-hvt-0237.json",
        posterPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background.png",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0237/background-loop.mp4",
        publicationDate: "February 1, 2021",
    },
    fox: {
        supertitle: "Introduction to the testimony of",
        hvtID: "2033",
        title: "Esther Fox",
        author: "Sari Siegel",
        essayPath: "/data/intro-hvt-2033.json",
        publicationDate: "February 1, 2021",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/2033/background-loop.mp4",

    },
    frei: {
        supertitle: "Introduction to the testimony of",
        title: "Hans Frei",
        hvtID: "0170",
        author: "Ion Popa",
        essayPath: "/data/intro-hvt-0170.json",
        posterPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background.png",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0170/background-loop.mp4",
        publicationDate: "February 1, 2021",
    },
    zawistowska: {
        hvtID: "3169",
        supertitle: "Introduction to the testimony of",
        title: "Władysława Zawistowska",
        author: "Paweł Machcewicz",
        essayPath: "/data/intro-hvt-3169.json",
        publicationDate: "February 1, 2021",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3169/background-loop.mp4",

    },
    zwolinska: {
        hvtID: "3164",
        supertitle: "Introduction to the testimony of",
        title: "Helena Balicka-Zwolińska",
        author: "Anna Machcewicz",
        essayPath: "/data/intro-hvt-3164.json",
        publicationDate: "February 1, 2021",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/3164/background-loop.mp4",

    },
    riegner: {
        hvtID: "0764",
        supertitle: "Introduction to the testimony of",
        title: "Gerhart M. Riegner",
        author: "Gil Rubin",
        essayPath: "/data/intro-hvt-0764.json",
        posterPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/critical-editions/0764/background.png",
        videoPath:
            "https://fortunoff-media-public.s3.ca-central-1.amazonaws.com/hvt-0764-background-loop.mp4",
        publicationDate: "February 1, 2021",
    },
    dynner: {
        hvtID: "3038",
        supertitle: "Introduction to the testimony of",
        title: "Rubin Pinski",
        author: "Glenn Dynner",
        essayPath: "/data/intro-hvt-3038.json",
        publicationDate: "February 1, 2021"
    }
};