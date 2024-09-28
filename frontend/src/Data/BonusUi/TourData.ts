import { StepType } from '@reactour/tour'
export const tourSteps:StepType[] = [
    {
        selector: '.step1',
        content: 'This is Profile image',
        position: "right"
    },
    {
        selector: '.step2',
        content: 'Change Profile image here',
        position: "top"

    },
    {
        selector: '.step3',
        content: 'This is your Social details',
    },
    {
        selector: '.step4',
        content: 'This is your Your detail',
    },
    {
        selector: '.step5',
        content: 'This is the your first Post',
    },
    {
        selector: '.step6',
        content: 'This is the your Last Post'
    },
    {
        selector: '.step7',
        content: 'This is your follower details'
    },
    {
        selector: '.step8',
        content: 'This is your profile image'
    }
]

export const tourProfileData = [
    {
        link: 'https://www.facebook.com/',
        icon: 'fa fa-facebook'
    },
    {
        link: 'https://accounts.google.com/',
        icon: 'fa fa-google-plus'
    },
    {
        link: 'https://twitter.com/',
        icon: 'fa fa-twitter'
    },
    {
        link: 'https://www.instagram.com/',
        icon: 'fa fa-instagram'
    },
    {
        link: 'https://rss.app/',
        icon: 'fa fa-rss'
    }
]

export const profileLikeData = [
    {
        class: 'list-inline-item b-r-gray pe-3',
        icon: 'fa fa-heart',
        text: "Like"
    },
    {
        class: 'list-inline-item b-r-gray pe-3',
        icon: 'fa fa-comment',
        text: "Comment"
    },
    {
        class: 'list-inline-item',
        icon: 'fa fa-paper-plane',
        text:"Share"
    }
]