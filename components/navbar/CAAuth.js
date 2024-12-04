import { openDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function CAAuth({className}) {
    const dispatch = useDispatch()
    const session = useSession()
    const router=useRouter()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <FaRegUserCircle 
                onClick={handleClick}
                className={cn("w-8 h-8 max-md:ml-auto max-md:mr-[88px] flex md:items-start cursor-pointer text-orange-500 my-auto", className)}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {session.status === "authenticated" ? (
                    <>
                        <MenuItem onClick={() => {
                            signOut()
                            handleClose()
                            router.push("/")
                        }}>Logout</MenuItem>
                        <MenuItem onClick={() => {
                            router.push("/campusambassador")
                            handleClose()
                        }}>CA Dashboard</MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={() => {
                        dispatch(openDialog({type:'login',title:'Login to CA'}))
                        handleClose()
                    }}>Login as CA</MenuItem>
                )}
            </Menu>
        </>
    )
}