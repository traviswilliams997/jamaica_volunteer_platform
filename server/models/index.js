import AgencyAddress from './agency_address.js'
import AgencyReview from './agency_review.js'
import AgencyToken from './agency_token.js'
import Agency from './agency.js'
import Comment from './comment.js'
import EventAttending from './event_attending.js'
import Event from './event.js'
import Follower from './follower.js'
import Membership from './membership.js'
import Position from './position.js'
import Post from './post.js'
import Reaction from './reaction.js'
import Session from './session.js'
import Streak from './streak.js'
import VolunteerReview from './volunteer_review.js'
import VolunteerAddress from './volunteer_address.js'
import Volunteer from './volunteer.js'
import VolunteerToken from './volunteer_token.js'

Volunteer.hasMany(Post, {
  onDelete: 'CASCADE',
})
Post.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })

Volunteer.hasOne(VolunteerAddress, { onDelete: 'CASCADE' })
VolunteerAddress.belongsTo(Volunteer)

Volunteer.hasMany(AgencyReview)
AgencyReview.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })
AgencyReview.belongsTo(Agency, { foreignKey: 'reviewed_agency_id' })

Volunteer.hasMany(Streak, { onDelete: 'CASCADE' })
Streak.belongsTo(Volunteer)

Post.hasMany(Comment, { onDelete: 'CASCASE' })
Comment.belongsTo(Post)
Comment.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })
Comment.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })
Comment.belongsTo(Comment, { foreignKey: ' comment_reply_to_id' })

Post.hasMany(Reaction, { onDelete: 'CASCADE' })
Reaction.belongsTo(Post)
Reaction.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })
Reaction.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })

Volunteer.hasMany(Follower, { onDelete: 'CASCADE' })
Follower.belongsTo(Volunteer, {
  as: 'following_volunteers',
  foreignKey: 'following_volunteer_id',
})
Follower.belongsTo(Volunteer, {
  as: 'followed_volunteers',
  foreignKey: 'followed_volunteer_id',
})

Agency.hasMany(Post, {
  onDelete: 'CASCADE',
})
Post.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })

Agency.hasMany(VolunteerReview)
VolunteerReview.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })
VolunteerReview.belongsTo(Volunteer, { foreignKey: 'reviewed_volunteer_id' })

Agency.hasMany(Position, { onDelete: 'Cascade' })
Position.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })

Agency.hasMany(Session)
Session.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })
Session.belongsTo(Volunteer)

Agency.hasOne(AgencyAddress, { onDelete: 'CASCADE' })
AgencyAddress.belongsTo(Agency)

Volunteer.belongsToMany(Agency, { through: Membership })
Agency.belongsToMany(Volunteer, { through: Membership })

Agency.hasMany(Event)
Event.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })

Volunteer.belongsToMany(Event, {
  through: EventAttending,
  foreignKey: 'attended_event_id',
})
Event.belongsToMany(Volunteer, {
  through: EventAttending,
  foreignKey: 'event_attendee_id',
})

Volunteer.hasMany(VolunteerToken, {
  foreignKey: 'volunteer_id',
  onDelete: 'CASCADE',
})
VolunteerToken.belongsTo(Volunteer, { foreignKey: 'volunteer_id' })

Agency.hasMany(AgencyToken, { foreignKey: 'agency_id', onDelete: 'CASCADE' })
AgencyToken.belongsTo(Agency, { foreignKey: 'agency_id' })

export {
  AgencyAddress,
  AgencyReview,
  AgencyToken,
  Agency,
  Comment,
  EventAttending,
  Event,
  Follower,
  Membership,
  Position,
  Post,
  Reaction,
  Session,
  Streak,
  VolunteerReview,
  VolunteerAddress,
  Volunteer,
  VolunteerToken,
}
