// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  //takes in a mesaage and logs it in the screen
  parse(message) {
    const lowercase = message.toLowerCase();
    if (lowercase.includes("hello") || lowercase.includes("hi")) {
      this.actionProvider.messageHandler();
    } else if (lowercase.includes("bunda:") || lowercase.includes("ayah:")) {
      this.actionProvider.handleVaksinStatus(message);
    } else if (
      lowercase.includes("Nama Anak: ") ||
      lowercase.includes("ayah:")
    ) {
      this.actionProvider.handleViewProfile(message);
    } else if (lowercase.includes("+62")) {
      this.actionProvider.handleViewProfile(message);
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}
export default MessageParser;
