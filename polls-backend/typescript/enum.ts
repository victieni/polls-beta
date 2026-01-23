export enum ePollStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  CLOSED = 'closed',
  OPEN = 'open',
  ARCHIVED = 'archived',
  INVALIDATED = 'invalidated',
}

export enum ePollType {
  SIMPLE = 'simple',
  ELECTION = 'election',
  SURVEY = 'survey',
  AWARD = 'award',
}

export enum eAdminPermissions {
  UPDATE_POLL = 'update_poll',
  UPDATE_CONTROLS = 'update_controls',
  UPDATE_OPTIONS = 'update_OPTIONS',
  READ_RESULTS = 'read_results',

  REGISTRATION_VERIFICATION = 'registration_verification',
}

export enum eRegistrationsStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}
