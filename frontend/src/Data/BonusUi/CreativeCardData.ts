import { BorderWarningtext, BorderWarningtext1, BorderWarningtext2, BorderWarningtext3, BryanOwens, CaitlinCoungeau, Freelance, GloriaAcheson, GracielaMcClaran, Issue, LolaStanford, Social, StellaNowland, TeresaMosteller } from "../../utils/Constant";

export const borderPrimaryState = [
    {
        img:"1.jpg",
        name:TeresaMosteller,
        active:true
    },
    {
        img:"3.png",
        name:GloriaAcheson
    },
    {
        img:"5.jpg",
        name:BryanOwens
    }
]

export const borderWarningState = [
    {
        color:"primary",
        detail:BorderWarningtext
    },
    {
        color:"danger",
        detail:BorderWarningtext1
    },
    {
        color:"success",
        detail:BorderWarningtext2
    },
    {
        color:"warning",
        detail:BorderWarningtext3
    }
]

export const borderStateData = [
    {
        text: StellaNowland,
        class: 'warning',
        text2: Freelance
    },
    {
        text: LolaStanford,
        class: 'danger',
        text2: Issue
    },
    {
        text: CaitlinCoungeau,
        class: 'primary',
        text2: Social
    },
    {
        text: GracielaMcClaran,
        class: 'danger',
        text2: Issue
    }
]