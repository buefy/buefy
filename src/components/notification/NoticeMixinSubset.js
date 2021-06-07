import NoticeMixin from '../../utils/NoticeMixin.js'

// skips props not used by `NoticeMixin` itself
// - type
// - message
// - duration
const {
    queue,
    indefinite,
    pauseOnHover,
    position,
    container
} = NoticeMixin.props

export default {
    ...NoticeMixin,
    props: {
        queue,
        indefinite,
        pauseOnHover,
        position,
        container
    }
}
