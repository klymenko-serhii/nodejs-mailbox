const { check, param } = require("express-validator/check");
const { matchedData } = require("express-validator/filter");

const BaseController = require("./base");

const MessageModel = require("../models/message");

class MessageController extends BaseController {
  constructor() {
    super();

    this.paginationPagesize = 2;

    this.getMessages = this.getMessages.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.archiveMessage = this.archiveMessage.bind(this);
    this.readMessage = this.readMessage.bind(this);
  }
  /**
   * 
   * @api {get} /messages Get Messages
   * @apiName GetMessages
   * @apiGroup Message
   * @apiPermission auth
   * @apiVersion  1.0.0
   * @apiDescription Retrieve a paginateable list of messages.
   * Show if messages were read already.
   * 
   * @apiParam {string=archived} [type=all] Type of message.
   * @apiParam {Number} page Pagination page.
   * 
   * @apiSuccess (200) {Object[]} messages List of all messages
   * @apiSuccess (200) {String} messages.uid Message id
   * @apiSuccess (200) {String} messages.sender Message sender
   * @apiSuccess (200) {String} messages.subject Message subject
   * @apiSuccess (200) {String} messages.message Message body
   * @apiSuccess (200) {Number} messages.time_sent Message time
   * @apiSuccess (200) {Boolean} messages.archived Message archived status
   * @apiSuccess (200) {Boolean} messages.readed Message readed status
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        messages: [{
          uid: '22',
          sender: 'Stephen King',
          subject: adoration
          message: The story is about a fire fighter.
          time_sent: 1459248747
        }]
     }
   * 
   */
  async getMessages(req, res, next) {
    try {
      const { page, type } = matchedData(req);
      const messages = await MessageModel.getMessages(page, type, this.paginationPagesize);
      res.json({ messages });
    } catch (err) {
      next(err);
    }
  }

  /**
   * 
   * @api {get} /message/:uid Get Message
   * @apiName GetMessageById
   * @apiGroup Message
   * @apiPermission auth
   * @apiVersion  1.0.0
   * @apiDescription Retrieve message by id, include read status and if message is achived.
   * 
   * @apiParam {String} uid Message id.
   * 
   * @apiSuccess (200) {Object} message Message
   * @apiSuccess (200) {String} message.uid Message id
   * @apiSuccess (200) {String} message.sender Message sender
   * @apiSuccess (200) {String} message.subject Message subject
   * @apiSuccess (200) {String} message.message Message body
   * @apiSuccess (200) {Number} message.time_sent Message time
   * @apiSuccess (200) {Boolean} messages.archived Message archived status
   * @apiSuccess (200) {Boolean} messages.readed Message readed status
   * 
   * @apiSuccessExample {json} Success-Response:
     {
        message: {
          uid: '22',
          sender: 'Stephen King',
          subject: adoration
          message: The story is about a fire fighter.
          time_sent: 1459248747
        }
     }
   * 
   * @apiUse MessageNotFound
   * 
   */
  async getMessage(req, res, next) {
    try {
      const { uid } = matchedData(req);
      const message = await MessageModel.getMessage(uid);
      if (message) {
        res.json({ message });
      } else {
        this.notFound(next);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * 
   * @api {put} /message/:uid/archive Archive Message
   * @apiName ArchiveMessage
   * @apiGroup Message
   * @apiPermission auth
   * @apiVersion  1.0.0
   * @apiDescription Marks message as archived.
   * 
   * @apiParam {String} uid Message id.
   * 
   * @apiSuccess (200) {Boolean} success Message archived.
   * 
   * @apiUse MessageNotFound
   * 
   */
  async archiveMessage(req, res, next) {
    try {
      const { uid } = matchedData(req);
      const message = await MessageModel.archiveMessage(uid);
      if (message) {
        this.successResponse(res);
      } else {
        this.notFound(next);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * 
   * @api {put} /message/:uid/read Read Message
   * @apiName ReadMessage
   * @apiGroup Message
   * @apiPermission auth
   * @apiVersion  1.0.0
   * @apiDescription Marks message as readed.
   * 
   * @apiParam {String} uid Message id.
   * 
   * @apiSuccess (200) {Boolean} success Message readed.
   * 
   * @apiUse MessageNotFound
   * 
   */
  async readMessage(req, res, next) {
    try {
      const { uid } = matchedData(req);
      const message = await MessageModel.readMessage(uid);
      if (message) {
        this.successResponse(res);
      } else {
        this.notFound(next);
      }
    } catch (err) {
      next(err);
    }
  }

  notFound(next) {
    next({
      status: 404,
      message: "Message not found."
    });
  }

  get validationChain() {
    return {
      getMessages: [
        check("type").optional().isIn(["archived"]),
        check("page").isInt().toInt(),
      ],
      getMessage: [
        param("uid").exists()
      ],
      archiveMessage: [
        param("uid").exists()
      ],
      readMessage: [
        param("uid").exists()
      ]
    };
  }
}

module.exports =  new MessageController();

/**
 * @apiDefine auth authorized user access only
 * Used base auth
 */

/**
 * @apiDefine MessageNotFound
 * @apiError (404) {String} error User not found
 */
