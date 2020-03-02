// import TimesheetService from '../../service/TimesheetService'

const CheckForCompliance = async (user: Parse.User) => {
  if (!user) {
    return 'no user'
  }
  const currentWarningcount = user.get('complianceWarningCount')
  if (currentWarningcount > 0) {
    return false
  }
  return true
}

export default CheckForCompliance
