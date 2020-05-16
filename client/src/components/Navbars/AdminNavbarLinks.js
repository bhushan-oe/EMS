import React, { useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Hidden from '@material-ui/core/Hidden'
import Poppers from '@material-ui/core/Popper'
import ChangePasswordModal from '../Modal/ChangePasswordModal'
// @material-ui/icons
import Person from '@material-ui/icons/Person'
// core components
import Button from '../../components/CustomButtons/Button'
import { logOut } from '../../actions/logoutAction'
import styles from '../../assets/jss/material-dashboard-react/components/headerLinksStyle'

const useStyles = makeStyles(styles)

export default function AdminNavbarLinks() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openProfile, setOpenProfile] = useState(null)
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null)
    } else {
      setOpenProfile(event.currentTarget)
    }
  }
  const handleCloseProfile = () => {
    setOpenProfile(null)
  }
  const handleClose = () => {
    dispatch(logOut())
    window.location.href = '/login'
  }
  const [isOpenChangePasswordModal, setOpenChangePasswordModal] = useState(
    false
  )

  const handleClickOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true)
  }

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false)
  }

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            ' ' +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                    <MenuItem
                      onClick={handleClickOpenChangePasswordModal}
                      className={classes.dropdownItem}
                    >
                      Change Password
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
        <ChangePasswordModal
          handleCloseChangePasswordModal={handleCloseChangePasswordModal}
          isOpenChangePasswordModal={isOpenChangePasswordModal}
        />
      </div>
    </div>
  )
}
