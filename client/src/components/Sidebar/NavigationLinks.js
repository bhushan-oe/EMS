import React from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import styles from '../../assets/jss/material-dashboard-react/components/sidebarStyle'

import Icon from '@material-ui/core/Icon'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
const useStyles = makeStyles(styles)

export const NavigationLinks = props => {
  const classes = useStyles()
  const { links, color, activeRoute, rtlActive } = props
  return (
    <List className={classes.list}>
      {links &&
        links.map((prop, key) => {
          let activePro = ' '
          let listItemClasses
          const { layout, path, showLink, icon, rtlName, name } = prop
          if (path === '/upgrade-to-pro') {
            activePro = `${classes.activePro} `
            listItemClasses = classNames({
              [` ${classes[color]}`]: true
            })
          } else {
            listItemClasses = classNames({
              [` ${classes[color]}`]: activeRoute(layout + path)
            })
          }
          const whiteFontClasses = classNames({
            [` ${classes.whiteFont}`]: activeRoute(layout + path)
          })
          return (
            <NavLink
              to={layout + path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              {showLink ? (
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof icon === 'string' ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: rtlActive
                        }
                      )}
                    >
                      {icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: rtlActive
                        }
                      )}
                    />
                  )}
                  <ListItemText
                    primary={rtlActive ? rtlName : name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: rtlActive
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              ) : null}
            </NavLink>
          )
        })}
    </List>
  )
}
