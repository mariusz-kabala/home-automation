import express from 'express'
import config from 'config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import rtsp from 'rtsp-ffmpeg'

type ChannelConfig = {
  id: string
  name: string
}

// const uri = 'rtsp://admin:ativada352@192.168.50.154:554/Streaming/Channels/801/'
// const stream = new rtsp.FFMpeg({ input: uri })
const channelsConfig = config.get<ChannelConfig[]>('hikvision.channels')

const HIK_CHANNELS = channelsConfig.reduce((channels: any, channelConfig) => {
  const uri = `rtsp://${config.get<string>('hikvision.username')}:${config.get<string>(
    'hikvision.password',
  )}@${config.get<string>('hikvision.host')}:${config.get<string>('hikvision.port')}/Streaming/Channels/${
    channelConfig.id
  }/`
  const stream = new rtsp.FFMpeg({
    input: uri,
    rate: 10, // output framerate (optional)
    resolution: '800x600',
  })

  channels[channelConfig.id] = stream

  return channels
}, {})

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  /* options */
})
const callbacks: any = {}

io.on('connection', function(socket) {
  socket.emit('channels', channelsConfig)
  socket.on('joinChannel', channel => {
    if (Object.keys(HIK_CHANNELS).includes(channel)) {
      socket.join(channel)
    }
  })
})

io.of('/').adapter.on('join-room', room => {
  if (Object.keys(HIK_CHANNELS).includes(room) && io.of(`/${room}`).adapter.sockets.length === 1) {
    callbacks[room] = (data: any) => {
      io.to(room).emit(`data-${room}`, data.toString('base64'))
    }

    HIK_CHANNELS[room].on('data', callbacks[room])
  }
})

io.of('/').adapter.on('leave-room', room => {
  if (Object.keys(HIK_CHANNELS).includes(room) && io.of(`/${room}`).adapter.sockets.length === 0) {
    HIK_CHANNELS[room].removeListener('data', callbacks[room])

    delete callbacks[room]
  }
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

httpServer.listen(3000, () => {
  console.info('server started on port 3000')
})
