import { showMessage } from 'react-native-flash-message'
import { colors, fonts } from '~/styles/theme'

type Props = {
  message: string
  description?: string
  type: 'success' | 'warning' | 'danger' | 'info'
}

export default function Toast(props: Props) {
  const { message, description, type } = props

  showMessage({
    message,
    description,
    type,
    icon: type,
    floating: true,
    duration: 2000,
    style: {
      zIndex: 9999,
      borderWidth: 0,
      alignItems: 'center',
    },
    titleStyle: {
      color: colors.white,
      fontSize: 16,
      fontFamily: fonts.bold,
      marginBottom: 0,
    },
    textStyle: {
      color: colors.white,
      fontSize: 15,
      fontFamily: fonts.medium,
      marginBottom: 0,
    },
  })
}
