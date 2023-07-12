import React, { useMemo } from 'react'
import { colors, fonts } from '~/styles/theme'
import {
  Calendar as Calendario,
  CalendarUtils,
  LocaleConfig,
} from 'react-native-calendars'

import { Box, IBoxProps } from 'native-base'
import moment from 'moment'

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  today: 'Today',
}

LocaleConfig.defaultLocale = 'en'

export type markedDates = {
  [key: string]: {
    dotColor: string
    marked: boolean
  }
}
type Props = IBoxProps & {
  selected: string
  current: Date | string
  onDayPress: (day: any) => void
  dates?: markedDates
}

const Calendar = ({
  selected,
  dates,
  current,
  onDayPress,
  ...props
}: Props) => {
  const getDate = () => {
    const date = new Date(current)
    const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS[Z]')
    return CalendarUtils.getCalendarDateString(newDate)
  }

  const marked = useMemo(() => {
    return {
      [getDate()]: {
        dotColor: colors.primary,
        marked: false,
      },
      ...dates,
      [selected]: {
        customStyles: {
          container: {
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: 8,
          },
          text: {
            color: colors.white,
            fontFamily: fonts.bold,
          },
        },
      },
    }
  }, [selected])

  return (
    <Box {...props}>
      <Calendario
        markingType={'custom'}
        current={current as any}
        onDayPress={onDayPress}
        markedDates={marked as any}
        style={{ borderRadius: 10 }}
        theme={{
          calendarBackground: colors.white,
          monthTextColor: colors.gray,
          arrowColor: colors.gray,
          dayTextColor: colors.gray,
          todayTextColor: colors.primary,
          textSectionTitleColor: colors.primary,
          textDisabledColor: colors.grayLightOpacity,
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 12,
          textDayFontFamily: fonts.medium,
          textMonthFontFamily: fonts.bold,
          textDayHeaderFontFamily: fonts.bold,
        }}
      />
    </Box>
  )
}

Calendar.defaultProps = {
  dates: {},
}

export default Calendar
