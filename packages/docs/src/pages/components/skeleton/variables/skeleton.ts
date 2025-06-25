export default [
    {
        sass: '<code>$skeleton-gradient</code>',
        css: '<code>--bulma-skeleton-gradient</code>',
        description: 'The gradient background for skeleton loading effect',
        default: '<code>linear-gradient(90deg, cv.getVar(\'border\') 25%, cv.getVar(\'border-active\') 50%, cv.getVar(\'border\') 75%)</code>'
    },
    {
        sass: '<code>$skeleton-duration</code>',
        css: '<code>--bulma-skeleton-duration</code>',
        description: 'The animation duration for skeleton loading',
        default: '<code>1.5s</code>'
    },
    {
        sass: '<code>$skeleton-margin-top</code>',
        css: '<code>--bulma-skeleton-margin-top</code>',
        description: 'The margin top for skeleton items',
        default: '<code>.5rem</code>'
    }
]
