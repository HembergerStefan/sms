import {useMutation, useQuery, useQueryClient} from 'react-query'
import axios from 'axios'

import {ApiConfig} from '../../data/api_data/ApiConfig'
import useUserStore from '../../stores/user_session/userStore'
import useRoleStore from '../../stores/role/roleInformationStore'

import {AvailableClient, Client, Group, Package, Script, User} from '../../data/data_types'

export const useGetClientsQuery = () => {
    const {token, roleId, setUserToken} = useUserStore()
    const {getRoleById} = useRoleStore()

    return useQuery(['clients'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/clients/${token}`)
                .then((res) => res.data), {
            enabled: token !== undefined && getRoleById(roleId).name === 'Admin',
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetScriptsQuery = () => {
    const {token, setUserToken} = useUserStore()

    return useQuery(['scripts'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/scripts/${token}`)
                .then((res) => res.data), {
            enabled: token !== undefined,
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetPackagesQuery = () => {
    const {token, setUserToken} = useUserStore()

    return useQuery(['packages'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/programs/${token}`)
                .then((res) => res.data), {
            enabled: token !== undefined,
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetUsersQuery = () => {
    const {token, roleId, setUserToken} = useUserStore()
    const {roles, getRoleById} = useRoleStore()

    return useQuery(['users'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/users/${token}`)
                .then((res) => res.data), {
            enabled: roles.length !== 0 && token !== undefined && getRoleById(roleId).name === 'Admin',
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetRolesQuery = () => {
    const {token, setUserToken} = useUserStore()

    return useQuery(['roles'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/roles/${token}`)
                .then((res) => res.data), {
            enabled: token !== undefined,
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetGroupsQuery = () => {
    const {token, roleId, setUserToken} = useUserStore()
    const {getRoleById} = useRoleStore()

    return useQuery(['groups'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/groups/${token}`)
                .then((res) => res.data), {
            enabled: token !== undefined && getRoleById(roleId).name === 'Admin',
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetAvailableClientsQuery = () => {
    const {token, roleId, setUserToken} = useUserStore()
    const {getRoleById} = useRoleStore()

    return useQuery(['availableClients'], () =>
            axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/availableClients/${token}`)
                .then((res) => res.data), {
            enabled: token !== undefined && getRoleById(roleId).name === 'Admin',
            refetchOnWindowFocus: false,
            refetchInterval: 15_000,
            onError: () => setUserToken(undefined)
        }
    )
}

export const useGetUserRoleQuery = () => {
    const {token, id, setUserToken} = useUserStore()

    return useQuery(['userRole'], () =>
        axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/RoleByUser/${id}/${token}`)
            .then(res => res.data), {
        enabled: token !== undefined,
        refetchOnWindowFocus: false,
        onError: () => setUserToken(undefined)
    })
}

export const useGetTaskQuery = () => {
    const {token, roleId, setUserToken} = useUserStore()
    const {getRoleById} = useRoleStore()

    return useQuery(['tasks'], () =>
        axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/tasks/${token}`)
            .then(res => res.data), {
        enabled: token !== undefined && getRoleById(roleId).name === 'Admin',
        refetchOnWindowFocus: false,
        refetchInterval: 15_000,
        onError: () => setUserToken(undefined)
    })
}

export const useGetClientScriptsQuery = (macAddress: string) => {
    const {token, setUserToken} = useUserStore()

    return useQuery(['clientScripts'], () =>
        axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/clientScripts/${token}/${macAddress}`)
            .then(res => res.data), {
        enabled: token !== undefined,
        refetchOnWindowFocus: false,
        refetchInterval: 15_000,
        onError: () => setUserToken(undefined)
    })
}

export const useAddScriptMutation = (addingScript: Script) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/insertScript/${token}`, {
            'id': addingScript.id,
            'name': addingScript.name,
            'description': addingScript.description,
            'scriptValue': addingScript.code,
            'interpreter': addingScript.language,
            'fileExtension': addingScript.fileExtension,
            'clients': []
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries('scripts'),
        onError: () => setUserToken(undefined)
    })
}

export const useAddPackageMutation = (addingPackage: Package) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/insertPackage/${token}`, {
            'id': addingPackage.id,
            'name': addingPackage.name,
            'version': addingPackage.version,
            'date': addingPackage.addingDate,
            'downloadLink': addingPackage.url,
            'silentSwitch': addingPackage.silentSwitch,
            'clients': []
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('packages')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useAddGroupMutation = (addingGroup: Group) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/insertGroup/${token}`, {
            'id': addingGroup.id,
            'name': addingGroup.name,
            'clients': [],
            'users': []
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('groups')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useAddUserMutation = (addingUser: User) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/insertUser/${token}`, {
            'id': addingUser.id,
            'username': addingUser.username,
            'password': addingUser.password,
            'role': {
                'id': addingUser.role,
                'name': ''
            }
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUpdateScriptMutation = (updateScript: Script) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/updateScript/${token}`, {
            'id': updateScript.id,
            'name': updateScript.name,
            'description': updateScript.description,
            'scriptValue': updateScript.code,
            'interpreter': updateScript.language,
            'fileExtension': updateScript.fileExtension,
            'clients': []
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('scripts')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUpdatePackageMutation = (updatePackage: Package) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/updatePackage/${token}`, {
            'id': updatePackage.id,
            'name': updatePackage.name,
            'version': updatePackage.version,
            'date': updatePackage.addingDate,
            'downloadLink': updatePackage.url,
            'silentSwitch': updatePackage.silentSwitch,
            'clients': []
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('packages')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUpdateGroupMutation = (updateGroup: Group) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/updateGroup/${token}`, {
            'id': updateGroup.id,
            'name': updateGroup.name,
            'clients': [],
            'users': []
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('groups')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUpdateClientMutation = (updateClient: Client) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/updateClient/${token}`, {
            'macAddress': updateClient.macAddress,
            'name': updateClient.name,
            'ip': updateClient.ip,
            'lastOnline': new Date(updateClient.lastOnline),
            'usedDiskspace': Number(updateClient.usedDiskspace),
            'cpuUsage': Number(updateClient.cpuUsage),
            'packages': [],
            'scripts': []
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUpdateUserMutation = (updateUser: User) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/updateUser/${token}`, {
            'id': updateUser.id,
            'username': updateUser.username,
            'password': updateUser.password !== '' ? updateUser.password : null,
            'role': {
                'id': '',
                'name': ''
            }
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUpdateUserRoleMutation = (updateUser: User) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.post(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/changeUserRole/${token}/${updateUser.id}`, {
            'id': updateUser.role,
            'name': ''
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        },
        onError: () => setUserToken(undefined)
    })
}


export const useRemoveScriptMutation = () => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removeScript/${id}/${token}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('scripts')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useRemovePackageMutation = () => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removePackage/${id}/${token}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('packages')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useRemoveGroupMutation = () => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removeGroup/${id}/${token}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('groups')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useRemoveClientMutation = () => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removeClient/${id}/${token}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useRemoveUserMutation = () => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation((id: string) => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removeUser/${id}/${token}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useActivateClientMutation = (activateClient: AvailableClient) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.put(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/activateClient/${activateClient.macAddress}/${token}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients')
            queryClient.invalidateQueries('availableClients')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useAddClientToGroupMutation = (clientId: string, groupId: string) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.put(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/addClientToGroup/${token}/${groupId}/${clientId}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients')
            queryClient.invalidateQueries('groups')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useRemoveClientFromGroupMutation = (groupId: string) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation((clientId: string) => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removeClientToGroup/${token}/${groupId}/${clientId}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('clients')
            queryClient.invalidateQueries('groups')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useAddUserToGroupMutation = (userId: string, groupId: string) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.put(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/addUserToGroup/${token}/${groupId}/${userId}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('groups')
            queryClient.invalidateQueries('users')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useRemoveUserFromGroupMutation = (userId: string, groupId: string) => {
    const {token, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.delete(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageAdmin/removeUserToGroup/${token}/${groupId}/${userId}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('groups')
            queryClient.invalidateQueries('users')
        },
        onError: () => setUserToken(undefined)
    })
}

export const usePackageTaskMutation = () => {
    const {token, id, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(({clientId, packageId}: { clientId: string, packageId: string }) => {
        return axios.put(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/package/${token}/${id}/${clientId}/${packageId}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useScriptTaskMutation = () => {
    const {token, id, setUserToken} = useUserStore()
    const queryClient = useQueryClient()

    return useMutation(({clientId, scriptId}: { clientId: string, scriptId: string }) => {
        return axios.put(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/scripts/${token}/${id}/${clientId}/${scriptId}`)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        },
        onError: () => setUserToken(undefined)
    })
}

export const useUserPermittedQuery = () => {
    const {token, id, setUserToken} = useUserStore()

    return useQuery(['userPermitted'], () =>
        axios.get(`${ApiConfig.baseUrl}:${ApiConfig.port}/webpageUser/RoleByUser/${id}/${token}`)
            .then(res => res.data), {
        enabled: token !== undefined && id !== undefined,
        onError: () => setUserToken(undefined)
    })
}