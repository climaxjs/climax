// tslint:disable:max-line-length

import rorre from 'rorre'

export default rorre.declare({
  ERR_CMD_ACTN_V_UND: `The command action has not been set.`,
  ERR_CMD_ACTN_V_TYP: `The command action is mandatory and must be a function.`,
  ERR_CMD_DESC_V_UND: `The command description has not been set.`,
  ERR_CMD_DESC_V_LEN: `The command description can't be empty.`,
  ERR_CMD_DESC_V_TYP: `The command description is mandatory and must be a string.`,
  ERR_CMD_OPT_DESC_V_LEN: `The option description can't be empty.`,
  ERR_CMD_OPT_DESC_V_TYP: `The option description is mandatory and must be a string.`,
  ERR_CMD_OPT_SLUG_V_LEN: `The option slug can't be empty.`,
  ERR_CMD_OPT_SLUG_V_TYP: `The option slug is mandatory and must be a string.`,
  ERR_CMD_VLUE_DESC_V_LEN: `The value description can't be empty.`,
  ERR_CMD_VLUE_DESC_V_TYP: `The value description is mandatory and must be a string.`,
  ERR_CMD_VLUE_NAME_V_LEN: `The value name can't be empty.`,
  ERR_CMD_VLUE_NAME_V_TYP: `The value name is mandatory and must be a string.`,

  ERR_FILTS_IS_CONFLICT_MANDATORY_BOOLEAN: `TODO`,

  ERR_OPT_DESC_V_LEN: `The option description can't be empty.`,
  ERR_OPT_DESC_V_TYP: `The option description is mandatory and must be a string.`,
  ERR_OPT_FILT_V_TYP: `The option filter is not processable as is. Specify, at least, both the obligation and type.`,
  ERR_OPT_FILT_V_TYP_C: `If you want to use a custom option filter, this filter must be a function.`,
  ERR_OPT_SLUG_V_FMT: `The option slug format is wrong.`,
  ERR_OPT_SLUG_V_LEN: `The option slug can't be empty.`,
  ERR_OPT_SLUG_V_TYP: `The option slug is mandatory and must be a string.`,

  ERR_PRG_ARGS_V_LEN: `Something went wrong during the arguments validation (length < 2).`,
  ERR_PRG_ARGS_V_TYP: `Something went wrong during the arguments validation (not an array).`,
  ERR_PRG_DESC_V_UND: `The program description has not been set and can't be found in your package.json.`,
  ERR_PRG_DESC_V_LEN: `The program description can't be empty.`,
  ERR_PRG_DESC_V_TYP: `The program description must be a string..`,
  ERR_PRG_NAME_V_UND: `The program name has not been set and can't be found in your package.json.`,
  ERR_PRG_NAME_V_LEN: `The program name can't be empty.`,
  ERR_PRG_NAME_V_TYP: `The program name must be a string.`,
  ERR_PRG_VERS_V_UND: `The version has not been set and can't be found in your package.json.`,
  ERR_PRG_VERS_V_SEMVER: `The program version is not a valid SemVer string. Please check https://semver.org to get more info.`,
  ERR_PRG_VERS_V_TYP: `The program version must be a string.`,
  ERR_PRG_VERS_V_V: `The version you set can't start with a "v" or a "V". If you want to declare "vX.Y.Z", just declare "X.Y.Z".`,
})
