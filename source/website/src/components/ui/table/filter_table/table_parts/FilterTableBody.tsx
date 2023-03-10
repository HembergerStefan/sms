import React, {useEffect, useState} from 'react'

import {useTranslation} from 'react-i18next'
import {ColumnDef, flexRender, Table} from '@tanstack/react-table'

import {DataTypes} from '../../../../../data/data_types'

import BoxHeading from '../../../box_heading_container/BoxHeading'
import useClientStore, {initialClientState} from '../../../../../stores/clientInformationStore'
import Dropdown from '../../../../form/dropdown/Dropdown'
import useFilterDataListStore from '../../../../../stores/filterDataListStore'
import FilterClientTableDropdownContent
    from '../../../../form/dropdown/filter_table/filter_client_table/FilterClientTableDropdownContent'
import useGroupStore, {initialGroupState} from '../../../../../stores/groupInformationStore'
import FilterGroupTableDropdownContent
    from '../../../../form/dropdown/filter_table/filter_group_table/FilterGroupTableDropdownContent'

interface FilterTableBodyProps {
    table: Table<any>
    columns: ColumnDef<any, any>[]
    tableType: DataTypes
    setForTableType: Function
}

const FilterTableBody = ({table, columns, tableType, setForTableType}: FilterTableBodyProps) => {

    const {t} = useTranslation()

    /* Get the selected clients out of the store & the possibility to update the store */
    const {clients, getClientByName} = useClientStore()

    /* Get the selected groups out of the store & the possibility to update the store */
    const {groups, getGroupByName} = useGroupStore()

    const {forClient, forGroup, setForClient, setForGroup} = useFilterDataListStore()

    let defaultClient = clients.at(0) ?? initialClientState
    let defaultGroup = groups.at(0) ?? initialGroupState

    const [mountDropdown, setMountDropdown] = useState<boolean>(false)
    const [clientNameItems, setClientNameItems] = useState<string[]>(clients.map(client => client.name))
    const [groupNameItems, setGroupNameItems] = useState<string[]>(groups.map(group => group.name))

    useEffect(() => {
        setClientNameItems(clients.map(client => client.name))
    }, [clients])

    useEffect(() => {
        setGroupNameItems(groups.map(group => group.name))
        /* If client was added to group -> set selectedGroup to default so the component will rerender */
        setForGroup(defaultGroup)
    }, [groups])

    /* User selected item, so change the client/group */
    const handleChange = (cr: string): void => {
        if (tableType === 0 || tableType === 1) {
            setForClient(getClientByName(cr) !== undefined ? getClientByName(cr)! : initialClientState)
            setForTableType({type: tableType, client: forClient, group: forGroup})
        } else if (tableType === 3) {
            setForGroup(getGroupByName(cr))
            setForTableType({type: tableType, client: forClient, group: forGroup})
        }
    }

    const scriptFilter = (): void => {
        setForClient(forClient)
        setForTableType({type: DataTypes.SCRIPT, client: forClient, group: forGroup})
    }

    const packageFilter = (): void => {
        setForClient(forClient)
        setForTableType({type: DataTypes.PACKAGE, client: forClient, group: forGroup})
    }

    return (
        <tbody id='basic-table--body'>

        {/* Trick so that the header with the menu button is between the thead and the tbody with some margin,
                    but it spans over all the columns, so that the menu button will be on the right outer side and the
                    heading on the left outer side */}
        <tr>
            <td colSpan={columns.length} style={{borderRadius: 'var(--br-r-medium) var(--br-r-medium) 0 0'}}>
                <BoxHeading content={
                    <>
                        <h2 className='fs-qr-1 fw--semi-bold'>
                            {tableType === 0 ? t('Executed Scripts') : tableType === 1 ? t('Installed Packages') : t('Clients in Group')}</h2>

                        <div id='filter--menu-items'>
                            {
                                tableType !== 3 ?
                                    <>
                                        <button className={tableType === 0 ? 'active--filter-button' : undefined}
                                                onClick={() => scriptFilter()}>
                                            <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>{t('Scripts')}</span>
                                        </button>

                                        <button className={tableType === 1 ? 'active--filter-button' : undefined}
                                                onClick={() => packageFilter()}>
                                            <span className='fw--semi-bold clr-sc-1 fs-tr-body-1'>{t('Packages')}</span>
                                        </button>
                                    </>
                                    : null
                            }

                            <Dropdown defaultValue={tableType !== 3 ? defaultClient.name : defaultGroup.name}
                                      items={tableType !== 3 ? clientNameItems : groupNameItems}
                                      handleChange={handleChange}/>
                        </div>
                    </>
                } dropdownContent={tableType === 0 || tableType === 1 ?
                    <FilterClientTableDropdownContent setMountDropdown={setMountDropdown}/> : tableType === 3 ?
                        <FilterGroupTableDropdownContent setMountDropdown={setMountDropdown}/> : null}
                            mountDropdown={mountDropdown} setMountDropdown={setMountDropdown}/>
            </td>
        </tr>

        {
            table.getPageCount() === 0 ? <tr>
                    <td colSpan={columns.length}>
                        <span className='fw--semi-bold clr-pr-1'>{t('No entries available')}!</span>
                    </td>
                </tr> :
                /* Display the row/cell content */
                table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {
                            row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
        }
        </tbody>
    )
}

export default FilterTableBody