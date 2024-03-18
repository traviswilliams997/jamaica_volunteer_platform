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
  foreignKey: 'created_by_volunteer_id',
})
Post.belongsTo(Volunteer, {
  as: 'createdByVolunteer',
})

Volunteer.hasOne(VolunteerAddress, { onDelete: 'CASCADE' })
VolunteerAddress.belongsTo(Volunteer)

Volunteer.hasMany(AgencyReview)
AgencyReview.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })
AgencyReview.belongsTo(Agency, { foreignKey: 'reviewed_agency_id' })

Volunteer.hasMany(Streak, { onDelete: 'CASCADE' })
Streak.belongsTo(Volunteer)

Post.hasMany(Comment, { onDelete: 'CASCADE' })
Comment.belongsTo(Post)
Comment.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })
Comment.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })
Comment.belongsTo(Comment, { foreignKey: ' comment_reply_to_id' })

Post.hasMany(Reaction, { onDelete: 'CASCADE' })
Reaction.belongsTo(Post)
Reaction.belongsTo(Volunteer, { foreignKey: 'created_by_volunteer_id' })
Reaction.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })

Volunteer.belongsToMany(Volunteer, {
  through: Follower,
  as: 'followingVolunteer',
  foreignKey: 'following_volunteer_id',
})

Volunteer.belongsToMany(Volunteer, {
  through: Follower,
  as: 'followedVolunteer',
  foreignKey: 'followed_volunteer_id',
})

Follower.belongsTo(Volunteer, {
  foreignKey: 'followed_volunteer_id',
})

Follower.belongsTo(Volunteer, {
  foreignKey: 'following_volunteer_id',
})
Agency.hasMany(Post, {
  onDelete: 'CASCADE',

  foreignKey: 'created_by_agency_id',
})
Post.belongsTo(Agency, {
  as: 'createdByAgency',
  foreignKey: 'created_by_agency_id',
})

Agency.hasMany(VolunteerReview)
VolunteerReview.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })
VolunteerReview.belongsTo(Volunteer, { foreignKey: 'reviewed_volunteer_id' })

Agency.hasMany(Position, {
  onDelete: 'CASCADE',
})
Position.belongsTo(Agency, { as: 'createdByAgency', foreignKey: 'agency_id' })

Agency.hasMany(Session, { foreignKey: 'created_by_agency_id' })
Session.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })
Session.belongsTo(Volunteer)
Volunteer.hasMany(Session)

Agency.hasOne(AgencyAddress, { onDelete: 'CASCADE' })
AgencyAddress.belongsTo(Agency)

Volunteer.belongsToMany(Agency, { through: Membership })
Agency.belongsToMany(Volunteer, { through: Membership })

Volunteer.hasMany(Membership)
Membership.belongsTo(Volunteer)

Agency.hasMany(Membership)
Membership.belongsTo(Agency)

Agency.hasMany(Event, { foreignKey: 'created_by_agency_id' })
Event.belongsTo(Agency, { foreignKey: 'created_by_agency_id' })

Volunteer.belongsToMany(Event, {
  through: EventAttending,
  foreignKey: 'event_id',
  as: 'attendedEventId',
})
Event.belongsToMany(Volunteer, {
  through: EventAttending,
  foreignKey: 'volunteer_id',
  as: 'eventAttendee',
})

Volunteer.hasMany(VolunteerToken, {
  onDelete: 'CASCADE',
})
VolunteerToken.belongsTo(Volunteer)

Agency.hasMany(AgencyToken, { onDelete: 'CASCADE' })
AgencyToken.belongsTo(Agency)

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
