export type KeyWord = {
    name: string
    link: string
    componentClassName?: string
    page?: string
}

export const KeyWords: KeyWord[] = [
    {name: 'Overview', link: '/'},
    {name: 'Clients', link: '/clients'},
    {name: 'Groups', link: '/groups'},
    {name: 'Scripts', link: '/scripts'},
    {name: 'Packages', link: '/packages'},
    {name: 'Users', link: '/users'},
    {name: 'Settings', link: '/settings'},
    {name: 'Available Clients', link: '/', componentClassName: 'available-clients--section', page: 'Overview'},
    {name: 'Open Tasks', link: '/', componentClassName: 'text-list--container', page: 'Overview'},
    {name: 'Executed Scripts', link: '/', componentClassName: 'basic-table', page: 'Overview'},
    {name: 'Client-Script Executions', link: '/clients', componentClassName: 'text-list--container', page: 'Clients'},
    {name: 'All Clients', link: '/clients', componentClassName: 'basic-card-list-container', page: 'Clients'},
    {name: 'Users in Groups', link: '/groups', componentClassName: 'user-group--section', page: 'Groups'},
    {name: 'Clients in Group', link: '/groups', componentClassName: 'basic-table', page: 'Groups'},
    {name: 'All Scripts', link: '/scripts', componentClassName: 'basic-table', page: 'Scripts'},
    {name: 'All Packages', link: '/packages', componentClassName: 'basic-table', page: 'Packages'},
    {name: 'All Users', link: '/users', componentClassName: 'basic-table', page: 'Users'},
    {name: 'Appearance', link: '/settings', componentClassName: 'appearance-container', page: 'Settings'}
]