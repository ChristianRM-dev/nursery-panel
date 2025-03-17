import { Box, Loader, Overlay, Text } from '@mantine/core'

const FormOverlay: React.FC = () => (
  <>
    <Overlay backgroundOpacity={0.1} blur={1} zIndex={100} />
    <Box
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        textAlign: 'center',
      }}
    >
      <Loader size="xl" color="blue" />
    </Box>
  </>
)

export default FormOverlay
